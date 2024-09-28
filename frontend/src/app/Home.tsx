"use client"

import { useState } from "react"
import { Input } from "../components/input"
import { Button } from "../components/button"
import { Card, CardContent } from "../components/card"
import { HomeIcon, SettingsIcon, SearchIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { searchHandler } from "./api"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<{ title: string; url: string }[]>([])
  const [searchSummary, setSearchSummary] = useState<string>('')
  const [showSearchSummary, setShowSearchSummary] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    setError(null)
    setShowSearchSummary(false)

    try {
      console.log("search query: ", searchQuery)
      console.log("process started")

      const documents = await searchHandler(searchQuery)
      setSearchResults(documents.topDocuments)
      setSearchSummary(documents.summary)
      setShowSearchSummary(true)
      setIsOpen(true)
      console.log(documents)
    } catch (err) {
      setError('Failed to fetch search results. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const toggleSummary = () => {
    setIsOpen(!isOpen)
  }

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
                handleSearch()
              }
            }}
          />
        </div>

        {/* Loading state */}
        {loading && <p className="text-center text-gray-600">Loading...</p>}

        {/* Error message */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Search summary as a custom dropdown */}
        {showSearchSummary && (
          <div className="max-w-3xl mx-auto mb-8 bg-white border border-gray-200 rounded-lg shadow-sm">
            <Button
              variant="ghost"
              size="lg"
              className="flex w-full justify-between p-4 font-semibold text-gray-900"
              onClick={toggleSummary}
            >
              Search Results Summary
              {isOpen ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </Button>
            {isOpen && (
              <div className="p-4 text-sm text-gray-600">
                {searchSummary}
              </div>
            )}
          </div>
        )}

        {/* Search results */}
        <div className="grid gap-4 max-w-3xl mx-auto">
          {searchResults.map((item, index) => (
            <Card key={index} className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="flex items-start p-4">
                <div>
                  <h2 className="text-lg font-semibold mb-1 text-gray-900">{item.title}</h2>
                  <a href={item.url} className="text-sm text-gray-600">{item.url}</a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}