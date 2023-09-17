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
                            <input type='checkbox'  checked={selected.includes(' An Elegant Addition to Any Outfit')} name=' An Elegant Addition to Any Outfit' onChange={handlecbClick}/>
                            <span>
                          An Elegant Addition to Any Outfit</span>
                        </label>
                        <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                            <input type='checkbox' checked={selected.includes('100% Authentic')} name='100% Authentic'onChange={handlecbClick}/>
                            

                            <span>100% Authentic</span>
                        </label>
                        <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                            <input type='checkbox' checked={selected.includes('A Long-Term Sustainable Investment')} name='A Long-Term Sustainable Investment'onChange={handlecbClick}/>
                            

                            <span>A Long-Term Sustainable Investment</span>
                        </label>
                        <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                            <input type='checkbox' checked={selected.includes('Unique Design')} name='Unique Design'onChange={handlecbClick}/>
                            

                            <span>Unique Design</span>
                        </label>
                        
                    </div>
        </>
    )
}
