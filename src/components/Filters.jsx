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
    <div>
        <div className='filters-container'>
            <select 
                value={gender} 
                onChange={(e)=> setGender(e.target.value)}
            >
                <option value="">
                    All genders
                </option>
                <option value="male">
                    Hombre
                </option>
                <option value="female">
                    Mujer
                </option>
            </select>

            <input 
                type="text" 
                placeholder="Nacionalidad"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
            />
            <input 
                type="number" 
                placeholder="Edad minima"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Filters