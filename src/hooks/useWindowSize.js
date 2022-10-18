import { useState, useEffect } from 'react'

const useWindowSize = () => {
    const [ windowSize, setWindowSize ] = useState({
        width: undefined, 
        height: undefined
    })

    useEffect( ()=> {
            const handleResize = () => {
                setWindowSize({
                    width: window.innerWidth, 
                    height: window.innerHeight
                })
            }
            // const cleanup = () => {
            //     console.log('run if useEffect deps change')
            //     window.removeEventListener('resize', handleResize)
            // }
            handleResize()
            window.addEventListener('resize', handleResize)
            //return cleanup
            // returns the cleanup function 
            return ()=>window.removeEventListener('resize', handleResize)
        }, [])

    // returns the custom hook, which is more like a utility function.  
    return windowSize    
}

export default useWindowSize
