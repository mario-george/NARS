const JsonToTable = (props) => {
  const headers = Object.keys(props.json[0]);

  return <table className="mx-4 border-spacing-2 border-black border-2 rounded-lg text-center p-6 w-full h-full">
    <thead className="bg-sky-100">
      <tr>
        {headers.map(e => <th className="px-6 py-2 text-xs text-gray-500" key={e}>{e.replaceAll("_", " ").toUpperCase()}</th>)}
      </tr>
    </thead>
    <tbody className="bg-sky-50">{props.json.map((d,index) => <tr key={index}>
      {headers.map((e,index) => <td className="border-spacing-2 border-black border-2 px-6 py-4 first:text-sm first:text-gray-500" key={index}>{d[e]}</td>)}
    </tr> )}</tbody>
  </table>
}


export default JsonToTable