import { Input } from "../components/input"
import { Button } from "../components/button"
import { Card, CardContent } from "../components/card"
import { HomeIcon, SettingsIcon, SearchIcon, FileIcon } from "lucide-react"
// import frontend api request for sending the request to the backend
import { searchHandler } from "./api"
import { useState } from "react" 
export default function Home() {

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  // hide the search summary component until the search results are returned
  const [showSearchSummary, setShowSearchSummary] = useState<boolean>(false);

  const handleSearch = async () => {
    console.log("search query: ", searchQuery);
    console.log("process started");

    const results = await searchHandler(searchQuery);
    setSearchResults(results);
    setShowSearchSummary(true);

    console.log(results);
  };


   
  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-16 bg-white shadow-md p-4 flex flex-col items-center space-y-4">
        <Button variant="ghost" size="icon" className="w-10 h-10 text-gray-600 hover:text-gray-900 hover:bg-gray-200">
          <HomeIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="w-10 h-10 text-gray-600 hover:text-gray-900 hover:bg-gray-200">
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Sift</h1>
        
        {/* Search bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 w-full bg-white text-gray-800 placeholder-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
        </div>

        {/* Search summary */}
        {showSearchSummary && (
          <div className="max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Search Results</h2>
            <p className="text-sm text-gray-600">Showing {searchResults.length} results for "{searchQuery}"</p>
          </div>
        )}

        {/* Search results */}
        <div className="grid gap-4 max-w-3xl mx-auto">
          {[
            { icon: <FileIcon />, title: "Document 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
            { icon: <FileIcon />, title: "Document 2", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
            { icon: <FileIcon />, title: "Document 3", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
          ].map((item, index) => (
            <Card key={index} className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="flex items-start p-4">
                <div className="mr-4 text-black">{item.icon}</div>
                <div>
                  <h2 className="text-lg font-semibold mb-1 text-gray-900">{item.title}</h2>
                  <p className="text-sm text-gray-600">{item.content}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}