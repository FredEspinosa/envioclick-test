import React from 'react'

const Filters = ({
    gender,
    setGender,
    nationality,
    setNationality,
    age,
    setAge
}) => {
  return (
    <>
        <div className='filters-container display-flex'>
            <select 
                name='gender'
                value={gender} 
                onChange={(e)=> setGender(e.target.value)}
            >
                <option name="all" value="">
                    Todo
                </option>
                <option name="male" value="male">
                    Hombre
                </option>
                <option name="female" value="female">
                    Mujer
                </option>
            </select>

            <input 
                name='nationality'
                type="text" 
                placeholder="Nacionalidad"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
            />
            <input 
                name='age'
                min="0"
                type="number" 
                placeholder="Edad minima"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
        </div>
    </>
  )
}

export default Filters