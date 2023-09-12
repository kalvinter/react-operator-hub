
const Navigation = (props) => {

    let mainButton = ""

    if (props.mainButtonConfig.display){
        mainButton = (
            <li key="mainButton">
                <button 
                    onClick={(event) => {props.mainButtonConfig.onClick(event)}}
                    className="bg-gray-500 px-4 py-2 rounded">{props.mainButtonConfig.label}</button>
            </li>

        )
    }

    return (
        <div id='game-menu' className='w-full bg-slate-600 
        p-[1rem] rounded justify-between flex flex-row items-center'>
            <h1>Reactor Game</h1>
            <ul>
                {mainButton}
            </ul>
        </div>
    )
  }

  export default Navigation
