import React from "react";
import { useNavigate } from "react-router-dom";

const List = () => {
  const Doctors = [
    {
      Name: "demo",
      Department: "Child doctor",
      URL: "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
    },
    {
      Name: "demo",
      Department: "Child doctor",
      URL: "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
    },
    {
      Name: "demo",
      Department: "Child doctor",
      URL: "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
    },
    {
      Name: "demo",
      Department: "Child doctor",
      URL: "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
    },
    {
      Name: "demo",
      Department: "Child doctor",
      URL: "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
    },
    {
      Name: "demo",
      Department: "Child doctor",
      URL: "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
    },
    {
      Name: "demo",
      Department: "Child doctor",
      URL: "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
    },
    {
      Name: "demo",
      Department: "Child doctor",
      URL: "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
    }
  ];

  const navigate = useNavigate()

  return (
    <div>
      <div>
        <div class="container my-12 mx-auto px-4 md:px-12 justify-center w-full flex">
          <div class="flex flex-wrap -mx-1 lg:-mx-4 lg:w-4/5 sm:w-full">
            {Doctors.map((doctor) => (
              <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-3 lg:w-1/3  xl:w-1/4 lg:my-4 lg:px-4  cursor-pointer hover:scale-105 ease-in-out duration-200">
                <article class="overflow-hidden rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
                  <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                    <a href="#">
                      <img
                        alt="Placeholder"
                        class="block h-48 w-48 rounded-full object-cover"
                        src={doctor.URL}
                      />
                    </a>
                  </div>

                  <div class="flex items-center justify-center leading-tight">
                    <h1 class="text-lg">
                      <p class="no-underline text-black">{doctor.Name}</p>
                    </h1>
                  </div>

                  <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
                    <p>{doctor.Department}</p>
                  </div>
        
        
                  <div className="flex items-center justify-start leading-tight p-2 md:p-4">
                    

                    <p class="inline-flex items-center ml-16 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                      View profile
                      <svg
                      onClick={()=>navigate('/doctorProfile')}
                        aria-hidden="true"
                        class="w-4 h-4 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
