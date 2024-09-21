import { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = ({ projectsRef }) => {
  const [Projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [Search, setSearch] = useState("");
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await axios.get('https://portfolio-admin-api.vercel.app/api/get-project');
        setProjects(res.data);
        setFilteredProjects(res.data); // Initially show all projects
        setLoading(false)
      } catch (err) {
        console.error(err);
      }
    };

    getProjects();
  }, []);

  useEffect(() => {
    if (Search !== "") {
      const filtered = Projects.filter((project) =>
        project.Name.toLowerCase().includes(Search.toLowerCase())
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(Projects); // Show all projects when search is cleared
    }
  }, [Search, Projects]);

  

  return (
    <>
      <div ref={projectsRef} className="container-skills relative w-full min-h-screen bg-[#050816] px-[6em] py-[3em]">
        {
          Loading ? 
          <div className="loader absolute left-0 top-0 w-full h-full z-[100] flex items-center justify-center">
           <i className="absolute fa-solid fa-spinner fa-spin-pulse text-zinc-300 fa-2xl"></i>
        </div>
        : ''
        }

        <h1 className="op text-[#925EFF] w-[fit-content] font-semibold text-4xl hover:underline cursor-pointer">
          <span className="text-[#6940C1]">#</span> Projects
        </h1>

        <div id="searchinput" className=" relative w-[26em] h-[50px] mt-[2em]">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={Search}
            placeholder="Search Project..."
            className="absolute left-0 top-0 rounded-[12px] px-[1em] bg-[#1F1D38] h-full w-full text-zinc-100"
          />
          <i className="absolute fa-solid fa-magnifying-glass text-zinc-400 fa-xl right-4 cursor-pointer top-[50%]"></i>
        </div>

        <div id="projects" className="w-full py-[3em] flex gap-[2em] flex-wrap">
          {filteredProjects.map((Project, index) => (
            <div key={index} className="project w-[fit-content]">
              <div id="project-top" className="w-[22em] h-[28em] bg-[#1F1D38] rounded-[12px] p-[1em] relative">
                <img
                  src={Project.Image}
                  className="w-[100%] h-[44%] bg-zinc-700 rounded-[12px] mb-[1.3em]"
                  alt={Project.Name}
                />
                <h1 className="text-white text-[1.2em] font-medium">{Project.Name}</h1>
                <p className="text-[0.9em] w-[84%] text-white mt-[0.4em] opacity-[0.8]">{Project.Description}</p>
                <div className="tags left-[50%] gap-[0.4em] flex flex-wrap absolute bottom-0 left-0 w-[90%] h-[7em] py-[1em]">
                  {Project.Tags.map((tag, index) => (
                    <div key={index} className="rounded-[9px] w-[fit-content] px-[1.2em] h-[fit-content] py-[0.6em] bg-[#0D0C18] flex items-center justify-center">
                      <h1 className="text-white w-fit-content text-[0.8em]">{tag}</h1>
                    </div>
                  ))}
                </div>
              </div>

              <a href={Project.Link}>
                <div className="project-bottom cursor-pointer mt-[1em] w-full h-[2.7em] bg-[#6940C1] rounded-[12px] flex items-center justify-center">
                  <h1 className="text-white font-semibold opacity-[0.8]">View Project</h1>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;
