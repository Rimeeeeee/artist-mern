export default function Perks({selected,onChange}){
    function handlecbClick(ev){
        const {checked,name}=ev.target;
        if(checked){
        onChange([...selected,name]);
        }
        else{
            onChange([...selected.filter(selectedName=>selectedName !==name)]);
        }
    }
    return(
        <>
        <h2 className='text-2xl mt-4'>Perks</h2>
                    <p className='text-gray-500 text-sm'>Select all the perks</p>
                    <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
                        <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                            <input type='checkbox'  checked={selected.includes('wifi')} name='wifi' onChange={handlecbClick}/>
                            <span>
                            

                            Wifi</span>
                        </label>
                        <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                            <input type='checkbox' checked={selected.includes('parking')} name='parking'onChange={handlecbClick}/>
                            

                            <span>Free Parking Space</span>
                        </label>
                        <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                            <input type='checkbox' checked={selected.includes('TV')} name='TV'onChange={handlecbClick}/>
                            

                            <span>TV</span>
                        </label>
                        <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                            <input type='checkbox' checked={selected.includes('pets')} name='pets'onChange={handlecbClick}/>
                            

                            <span>Pets</span>
                        </label>
                        <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                            <input type='checkbox' checked={selected.includes('pvtentrance')} name='pvtentrance'onChange={handlecbClick}/>
                            

                            <span>Private Entrance</span>
                        </label>
                        
                    </div>
        </>
    )
}