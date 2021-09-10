import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'

interface AnnouncementProps {
    title: string,
    description?: string,
}

const AnnouncementRow = (props: AnnouncementProps) => {
    if (props.description) {
        return (<li>{props.title} - {props.description}</li>)
    } else {
        return (<li>{props.title}</li>)
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
        return (<><div>お知らせが{props.count}件あります</div><ul>{rows}</ul></>)
    } else {
        return (<div>お知らせはありません</div>)
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
        return (<div>loading...</div>)
    } else if (!announcementList.result) {
        return (<div>ERROR <a href="#" onClick={onReloadClicked}>更新</a></div>)
    } else {
        return (
            <>
                <AnnouncementList
                    count={announcementList.result.count}
                    announcements={announcementList.result.announcements} />
                <a href="#" onClick={onReloadClicked}>更新</a>
            </>
        )
    }
}

document.addEventListener('DOMContentLoaded', (e) => {
    ReactDom.render(<App />, document.getElementById('announcements-container'))
}, false)
