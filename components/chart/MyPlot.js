
function MyPlot(props) {

    const work = async () => {
        const Plotly = await import('plotly.js');
        const whenLoaded = (e) => {
        if(props.ref.current){
            Plotly.newPlot(
            props.ref.current,
            props.data,
            props.layout || {},
            props.config || {}
            )
        }
        }
        setTimeout(whenLoaded, 100);
    }
    work()
}

export default MyPlot;