import { useState, useCallback, useEffect} from "react";

const UniversitiesPage = () => {

    const [universities, setUniversities] = useState([]);

    const fetchUniversitiesHandler = useCallback(async () => {
        try {
          const response = await fetch('http://172.20.10.8:1000/api/all-unis', {
            mode: 'no-cors'
          }
           
            
          );
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
    
          const data = await response.json();
    
          const loadedUniversities = [];
    
          for (const key in data) {
            loadedUniversities.push({
              id: key,
              name: data[key].name,
              contactInfo: data[key].contactInfo,
              rating: data[key].rating,
            });
          }
          console.log("çektikeee");
          setUniversities(loadedUniversities);
        } catch (error) {
        }
      }, []);
    
      useEffect(() => {
        fetchUniversitiesHandler();
      }, [fetchUniversitiesHandler]);
    const universities1 = universities.map( (uni) => 
    <p>{uni.rating}</p>
    );
    return( <p>asdsadsad</p>);
};

export default UniversitiesPage;
