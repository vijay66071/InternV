// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav className="fixed top-0 left-0 w-full h-18 bg-[#003135] text-[#AFDDE5] shadow-md z-50">
//       <div className="container mx-auto px-4 py-2 flex items-center justify-between">
//         <div className="text-2xl font-bold">
//           <NavLink to="/" className="hover:text-[#76cdd3]">
//             InternV
//           </NavLink>
//         </div>
//         <ul className="flex space-x-4">
//           <li>
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `px-4 py-2 rounded-sm text-lg font-medium ${
//                   isActive ? 'text-[#245256]' : 'hover:bg-[#024950]'
//                 }`
//               }
//             >
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/dashboard"
//               className={({ isActive }) =>
//                 `px-4 py-2 rounded-sm text-lg font-medium ${
//                   isActive ? 'text-[#41868c]' : 'hover:bg-[#024950]'
//                 }`
//               }
//             >
//               Dashboard
//             </NavLink>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-18 bg-[#003135] text-[#AFDDE5] shadow-md z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="text-3xl font-bold">
          <NavLink to="/" className="text-[#f1f4f5] hover:text-[#76cdd3]">
            InternV
          </NavLink>
        </div>
        <ul className="flex space-x-4 items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-sm text-lg font-medium ${
                  isActive ? 'text-[#245256]' : 'hover:bg-[#024950]'
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-4 py-2 rounded-sm text-lg font-medium ${
                  isActive ? 'text-[#41868c]' : 'hover:bg-[#024950]'
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-4 py-2 rounded-sm text-lg font-medium ${
                  isActive ? 'text-[#41868c]' : 'hover:bg-[#024950]'
                }`
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `px-4 py-2 rounded-sm text-lg font-medium ${
                  isActive ? 'text-[#41868c]' : 'hover:bg-[#024950]'
                }`
              }>
              Sign Up
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
