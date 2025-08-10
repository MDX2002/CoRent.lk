import { useState } from 'react'
import { Posts } from '../../assets/Content.jsx'
import { FaStar } from 'react-icons/fa'


export default function SearchPage() {
    const [list, setList] = useState(Posts)
    const [query, setQuery] = useState('')
    const [sortField, setSortField] = useState('title')
    const [sortBy, setSortBy] = useState('ascending')
    const [result, setResult] = useState()

    const handleChange = (e) => {
        const value = e.target.value.toLowerCase()
        const filtered = Posts.filter((post) => {
            if (value === "") return true
            return (
                post.title.toLowerCase().includes(value) ||
                post.description.toLowerCase().includes(value) ||
                post.price.toString().includes(value)
            )
        })
        setResult(filtered)
        setQuery(value)
        setList(sortFun(filtered, sortBy, sortField))
    }

    const sortFun = (result, sortby, sortfield) => {
        const sorted = [...result]
        if (sortby === "ascending") {
            sorted.sort((a, b) => (a[sortfield] < b[sortfield] ? -1 : 1))
        } else {
            sorted.sort((a, b) => (a[sortfield] < b[sortfield] ? 1 : -1))
        }
        return sorted
    }

    const changeSortField = (field) => {
        setSortField(field)
        setList(result ? sortFun(result, sortBy, field) : sortFun(Posts, sortBy, field))
    }

    const changeSortType = (type) => {
        setSortBy(type)
        setList(result ? sortFun(result, type, sortField) : sortFun(Posts, type, sortField))
    }

    return (
        <div className="min-h-screen bg-gray-300 p-6 flex justify-center pt-30">
            <div className="w-full max-w-7xl px-4">
                <form className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Search:</label>
                            <input
                                type="search"
                                placeholder="Search by title, description, price..."
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sort Field:</label>
                            <select
                                name="field"
                                onChange={(e) => changeSortField(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="title">Title</option>
                                <option value="description">Address</option>
                                <option value="price">Price</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By:</label>
                            <select
                                name="sortby"
                                onChange={(e) => changeSortType(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="ascending">Ascending</option>
                                <option value="descending">Descending</option>
                            </select>
                        </div>
                    </div>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {list.map((post, index) => (
                        <div key={index} className="flex bg-white shadow rounded-lg overflow-hidden hover:scale-[1.01] transition-transform h-[200px]">
                            <img src={post.image} alt={post.title} className="w-[200px] h-full object-cover" />
                            <div className="p-4 flex flex-col justify-between">
                                <h2 className="text-lg font-bold text-gray-800 mb-2">{post.title}</h2> {/* Add `mb-2` here */}
                                <p className="text-sm text-gray-600">{post.description}</p>
                                <p className="text-blue-600 font-semibold mt-2">Rs:{post.price}</p>

                                
                                <div className="flex items-center mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="text-yellow-400 mr-1" />
                                    ))}
                                    <span className="text-sm font-medium text-gray-700 ml-2">5.0</span>
                                </div>

                            </div>
                        </div>
                    ))}
                    {list.length === 0 && (
                        <h2 className="text-center text-gray-500 text-xl col-span-full">No matching posts found!</h2>
                    )}
                </div>
            </div>
        </div>
    )
}
