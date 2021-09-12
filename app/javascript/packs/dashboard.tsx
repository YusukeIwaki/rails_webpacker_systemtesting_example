import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'

interface AnnouncementProps {
    title: string,
    description?: string,
}

const AnnouncementRow = (props: AnnouncementProps) => {
    if (props.description) {
        return (<li className="border-t-2 border-gray hover:bg-gray-100 p-1">{props.title}<div className="text-xs text-gray-600">{props.description}</div></li>)
    } else {
        return (<li className="border-t-2 border-gray hover:bg-gray-100 p-1">{props.title}</li>)
    }
}

interface AnnouncementListProps {
    count: number,
    announcements: (AnnouncementProps & { id: number })[],
}

const AnnouncementList = (props: AnnouncementListProps) => {
    if (props.count > 0) {
        const rows = props.announcements.map((announcement) => (
            <AnnouncementRow
                key={announcement.id}
                title={announcement.title}
                description={announcement.description} />))
        return (
            <>
                <div className="font-semibold text-sm">お知らせが{props.count}件あります</div>
                <ul>{rows}</ul>
            </>
        )
    } else {
        return (<div className="font-semibold text-sm">お知らせはありません</div>)
    }
}

interface AnnouncementLoadingState {
    loading: boolean,
    result?: AnnouncementListProps,
}

const App = () => {
    const [announcementList, setAnnouncementList] = useState<AnnouncementLoadingState>({ loading: true })

    const fetchAnnouncements = async () => {
        const response = await fetch('/api/announcements.json')
        if (response.status == 200) {
            const result = await response.json()
            setAnnouncementList({
                loading: false,
                result: {
                    count: result.count,
                    announcements: result.announcements.map((announcement) => {
                        return {
                            id: announcement.id,
                            title: announcement.title,
                            description: announcement.description,
                        }
                    })
                }
            })
        } else {
            setAnnouncementList({ loading: false })
        }
    }

    useEffect(() => {
        fetchAnnouncements()
    }, [])

    const onReloadClicked = (e: Event) => {
        e.preventDefault()
        setAnnouncementList({ loading: true })
        fetchAnnouncements()
    }

    if (announcementList.loading) {
        return (<div className="flex justify-center items-center"><span>loading...</span></div>)
    } else if (!announcementList.result) {
        return (
            <div className="flex flex-col justify-center items-center">
                <div className="text-xl text-bold text-gray-600 mb-2">ERROR</div>
                <a href="#" className="text-blue-500 underline" onClick={onReloadClicked}>更新</a>
            </div>
        )
    } else {
        return (
            <div className="bg-white shadow-md rounded px-4 py-3 m-2">
                <AnnouncementList
                    count={announcementList.result.count}
                    announcements={announcementList.result.announcements} />
                <a href="#" className="text-blue-500 underline" onClick={onReloadClicked}>更新</a>
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded', (e) => {
    const container = document.getElementById('announcements-container')
    container.setAttribute('class', 'w-full max-w-sm')
    ReactDom.render(<App />, container)
}, false)
