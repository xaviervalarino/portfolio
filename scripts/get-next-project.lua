-- Add correct "Next project" to the case study template
-- Uses YML metadata created by `create-project-list.js`

-- helper functions

local function forEach (table, callback)  
  for key,value in pairs(table) do
    callback(key, value)
  end
end

local function tablelength(T)
  local count = 0
  for _ in pairs(T) do count = count + 1 end
  return count
end

---

-- +1, or back to the start if it's the last one
function getNextPosition (position, max)
    local nextPosition
    local position = tonumber(position)
    if position == max then
      nextPosition = max + 1 - position
    else
      nextPosition = position + 1
    end
    return nextPosition
end

-- Find m.projects with an index of `nextProject`
-- Tack on nextProject metadata to be used by the template
function Meta(m) 
  local nextPosition
  local stringify = pandoc.utils.stringify
  local rosterlength = tablelength(m.roster)
  forEach(m.roster, function (id, project) 
    if stringify(m.title) == stringify(project.title) then
      nextPosition = getNextPosition(id, rosterlength)
    end
  end)
  m.nextProject = {
    title = m.roster[nextPosition].title,
    subtitle = m.roster[nextPosition].subtitle,
    href = m.roster[nextPosition].href
  }
  return m
end
