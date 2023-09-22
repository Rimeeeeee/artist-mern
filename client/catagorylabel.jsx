export default function Catagory({selected,onChange}){
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
        <h2 className='text-2xl mt-4'>Catagories:</h2>
                    <p className='text-gray-500 text-sm'>Select the most appropiate catagory</p>
                    <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
                        <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                            <input type='checkbox'  checked={selected.includes('Handicraft')} name='Handicraft' onChange={handlecbClick}/>
                            <span>
                          Handicraft</span>
                        </label>
                        <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                            <input type='checkbox' checked={selected.includes('Spice')} name='Spice'onChange={handlecbClick}/>
                            

                            <span>Spice</span>
                        </label>
                        <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                            <input type='checkbox' checked={selected.includes('Book')} name='Book'onChange={handlecbClick}/>
                            

                            <span>Book</span>
                        </label>
                        <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                            <input type='checkbox' checked={selected.includes('Clothing')} name='Clothing'onChange={handlecbClick}/>
                            

                            <span>Clothing</span>
                        </label>
                        <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                            <input type='checkbox' checked={selected.includes('Others')} name='Others'onChange={handlecbClick}/>
                            

                            <span>Others</span>
                        </label>
                        
                    </div>
        </>
    )
}