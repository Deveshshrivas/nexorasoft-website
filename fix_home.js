const fs = require("fs");
let filePath = "c:/Users/deves/Downloads/nexoraindia/client/src/pages/Home.jsx";
let content = fs.readFileSync(filePath, "utf-8");

content = content.replace(/import \{ getServices, getProducts \} from '\.\.\/api\/api';/g, 
  "import { getServices, getProjects } from '../api/api';");

content = content.replace(/import ProductCard from '\.\.\/components\/ProductCard';/g, 
  "import { FiExternalLink } from 'react-icons/fi';\nconst ProjectCard = ({ p, index }) => ( <div className='bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full'> <div className='relative h-56 overflow-hidden bg-gray-100'> {p.image ? ( <img src={p.image} alt={p.title} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' /> ) : ( <div className='w-full h-full flex items-center justify-center text-gray-400 font-medium'>No Image</div> )} </div> <div className='p-6 flex flex-col flex-1'> <h3 className='text-xl font-bold text-gray-900 mb-2'>{p.title}</h3> <p className='text-gray-600 text-sm mb-6 flex-1 line-clamp-2'>{p.description}</p> {p.link && ( <a href={p.link} target='_blank' rel='noopener noreferrer' className='inline-flex items-center text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors mt-auto'> View Live <FiExternalLink className='ml-1.5' /> </a> )} </div> </div>);");

content = content.replace(/getProducts\(\{ featured: true, limit: 4 \}\)/g, "getProjects()");
content = content.replace(/setProducts\(pRes\.data\.products \|\| \[\]\);?/g, "setProducts((pRes.data || []).filter(p => p.featured).slice(0, 4));");

content = content.replace(/India's Trusted IT & (Kids )?Products Partner/g, "India's Trusted IT Solutions Partner");
content = content.replace(/From cutting-edge web & mobile development, APIs, and DevOps .*? fun\./g, "From cutting-edge web & mobile development, APIs, and DevOps — to digital solutions that drive business growth.");
content = content.replace(/Shop Kids Products/g, "View Portfolio");
content = content.replace(/Shop Products/g, "View Portfolio");
content = content.replace(/to=\"\/products\"/g, "to=\"/projects\"");
content = content.replace(/to='\/products'/g, "to='/projects'");
content = content.replace(/KIDS PRODUCTS/g, "FEATURED WORK");
content = content.replace(/Fun & Educational Products for Kids/g, "Digital Solutions Built for Scale");
content = content.replace(/Kids Products Coming Soon/g, "Projects Coming Soon");
content = content.replace(/Start MongoDB and seed the database to see products here\./g, "We are currently updating our portfolio.");
content = content.replace(/Shop All Products/g, "View All Projects");
content = content.replace(/<ProductCard key=\{p\._id\} product=\{p\} index=\{i\} \/>/g, "<ProjectCard key={p._id} p={p} index={i} />");

fs.writeFileSync(filePath, content, "utf-8");
console.log("Done");
