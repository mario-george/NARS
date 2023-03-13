import React, { useState } from "react";
import Link from "next/link";


const NavLinks = ({cookies,id}) => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const links  = [
    {
      name: "Materials",
      submenu: true,
      sublinks: [
        {
          sublink: [
            { name: "Upload materials", link: `/instructor/courses/${cookies.instance_id}/materials/addmaterial` },
            { name: "View materials", link: `/instructor/courses/${cookies.instance_id}/materials/viewmaterials` },
          ],
        },
        
      ],
    },
    {
      name: "Assignments",
      submenu: true,
      sublinks: [
        {
          sublink: [
            { name: "Upload assingment", link: `/instructor/courses/${cookies.instance_id}/assignment/addassignment` },
            { name: "View assingments ", link: `/instructor/courses/${cookies.instance_id}/assignment/viewassignments` },
          ],
        },
        
      ],
    },
    {
      name: "Exams",
      submenu: true,
      sublinks: [
        {
          sublink: [
            { name: "Upload exam", link: `/instructor/courses/${cookies.instance_id}/exams/addexam` },
            { name: "View exams ", link: `/instructor/courses/${cookies.instance_id}/exams/viewexams  ` },
          ],
        },
        
      ],
    },
    {
      name: "Grades",
      submenu: true,
      sublinks: [
        {
          sublink: [
            
          ],
        },
        
      ],
    },
    {
      name: "Assesment",
      submenu: true,
      sublinks: [
        {
          sublink: [
            { name: "Direct assesment", link: "/" },
            { name: "Indirect assesment ", link: "/" },
          ],
        },
        
      ],
    },
  ];
  return (
    <>
      {links.map((link) => (
        <div>
          <div className="px-3 text-left md:cursor-pointer group">
            <h1
              className="py-7 flex justify-between items-center md:pr-0 pr-5 group hover:opacity-25"
              onClick={() => {
                heading !== link.name ? setHeading(link.name) : setHeading("");
                setSubHeading("");
              }}
            >
              {link.name}
              <span className="text-xl md:hidden inline">
                <ion-icon
                  name={`${
                    heading === link.name ? "chevron-up" : "chevron-down"
                  }`}
                ></ion-icon>
              </span>
              <span className="text-xl md:mt-1 md:ml-2  md:block hidden group-hover:rotate-180 group-hover:-mt-2">
                <ion-icon name="chevron-down"></ion-icon>
              </span>
            </h1>
            {link.submenu && (
              <div>
                <div className="absolute -mt-10 hidden group-hover:md:block hover:md:block w-44 z-50">
                  <div className="py-3 ">
                    <div
                      className="w-4 h-4 left-9 absolute 
                    mt-1 bg-gray-50 rotate-45 z-50"
                    ></div>
                  </div>
                  <div className="bg-gray-50 p-5 grid grid-cols-3 gap-10 rounded-xl shadow-xl z-50">
                    {link.sublinks.map((mysublinks) => (
                      <div>
                        <h1 className="text-lg font-semibold">
                          {mysublinks.Head}
                        </h1>
                        {mysublinks.sublink.map((slink) => (
                          <li className="text-sm text-gray-600 my-2.5">
                            <a
                              href={slink.link}
                              className="hover:text-primary hover:text-green-400"
                            >
                              {slink.name}
                            </a>
                          </li>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Mobile menus */}
          <div
            className={`
            ${heading === link.name ? "md:hidden" : "hidden"}
          `}
          >
            {/* sublinks */}
            {link.sublinks.map((slinks) => (
              <div>
                <div>
                  <h1
                    onClick={() =>
                      subHeading !== slinks.Head
                        ? setSubHeading(slinks.Head)
                        : setSubHeading("")
                    }
                    className="py-4 pl-7 font-semibold md:pr-0 pr-5 flex justify-between items-center md:pr-0 pr-5"
                  >
                    {slinks.Head}

                    <span className="text-xl md:mt-1 md:ml-2 inline">
                      <ion-icon
                        name={`${
                          subHeading === slinks.Head
                            ? "chevron-up"
                            : "chevron-down"
                        }`}
                      ></ion-icon>
                    </span>
                  </h1>
                  <div
                    className={`${
                      subHeading === slinks.Head ? "md:hidden" : "hidden"
                    }`}
                  >
                    {slinks.sublink.map((slink) => (
                      <li className="py-3 pl-14">
                        <a href={slink.link}>{slink.name}</a>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NavLinks;
