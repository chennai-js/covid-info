export function Select({
  options,
  onSelect,
  name,
  value
}) {

  const handleSelect = (evt) => {
    let selectedValue = evt.target.value;
    onSelect(selectedValue);
  }

  return <select className="rounded-full bg-gray-200 border-2 border-gray-500 px-2 max-w-xs" name={name} onChange={handleSelect}>
    {
      options.map((data, index) => {
        return <option value={data} key={index} selected={data === value}>{
          data
        }</option>
      })
    }
  </select>
}