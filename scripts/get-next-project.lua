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
function getNextPosition (table, position)
    local nextPosition
    local position = tonumber(position)
    local length = tablelength(table)

    if position == length then
      nextPosition = length + 1 - position
    else
      nextPosition = position + 1
    end
    return nextPosition
end

-- Find m.projects with an index of `nextProject`
-- Tack on nextProject metadata to be used by the template
function Meta(m) 
  local nextPosition
  if m.template and pandoc.utils.stringify(m.template) == 'case-study.html' then
    nextPosition = getNextPosition( m.projects, pandoc.utils.stringify(m.position) )
    forEach(m.projects, function (_, project) 
      local position = tonumber( pandoc.utils.stringify(project.position) )
      if position == nextPosition then
        m.nextProject = {
          title = project.title,
          subtitle = project.subtitle,
          href = project.href
        }
      end
    end)
  end
  return m
end
