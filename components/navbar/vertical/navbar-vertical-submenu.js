import Link from 'next/link'

const Submenu = ({ submenus }) => {
  // depthLevel = depthLevel + 1;depthLevel > 0 ?: ""
  const dropdownClass = "pcoded-submenu";
  return (
    <>
      <ul className={`${dropdownClass}`}>
        {submenus.map((submenu, index) => (
          <li id={`Sub${index}`} key={`${index}`}>
            <Link href={submenu.path} >
                <a >{submenu.title} </a>
                              
            </Link>
           
          
          </li>
        ))}
      </ul>
    </>
  );
};

export default Submenu;
