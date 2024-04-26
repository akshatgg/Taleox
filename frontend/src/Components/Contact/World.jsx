import Lottie from 'lottie-react'

import world from "../../assets/Animation - 1701628412297.json";

function World(){

    return(
        <div>

        <Lottie
        animationData={world}
        loop={true}
        autoPlay={true}
        className='w-[78%] h-auto'
      />
        </div>
    )
}


export default World;