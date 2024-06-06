import { Avatar } from './Avatar'
import styles from './doctor.module.css'
import { PencilLine } from 'phosphor-react'

interface SidebarProps {
    name: string
    description: string
    specialty: string
    picture: string
}

export function SideBar({name, description, specialty, picture}: SidebarProps) {
    return (
        <aside className={styles.sidebar}>
            <img className={styles.cover} src="https://images.unsplash.com/photo-1605379399642-870262d3d051?q=60&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

            <div className={styles.profile}>
                <Avatar src={picture || "/svg/notPicture.svg"}/>

                <strong>{name}</strong>
                <span>{specialty}</span>
            </div>

            <footer>
                <small>
                    {description || "Esse médico não tem uma descrição"}
                </small>

            </footer>
        </aside>
    )
}