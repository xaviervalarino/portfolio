function Block (b) 
  if b.t == 'Header' then
    table.insert(b.attr.classes, 'stuff')
  end
  if b.t == 'OrderedList' then
    -- return pandoc.RawBlock('html','<ol type="1"></ol>')
    print((b.content[2]))
  end
  -- if b.attr then print(table.unpack(b.attr)) end
  return b
  -- return {}
end
