
const Menu = (props) => {

    return (
        <div id='game-menu' className='w-full bg-slate-600 
        p-[1rem] rounded justify-between flex flex-row items-center'>
            <h1>Reactor Game</h1>

            <ul>
                <li><button 
                onClick={props.onClick}
                className="bg-gray-500 px-4 py-2 rounded">{props.label}</button></li>
            </ul>
        </div>
    )
  }
  
export default Menu
  