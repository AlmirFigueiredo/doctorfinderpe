import styles from './doctor.module.css'
import { ThumbsUp } from 'phosphor-react'
import { Avatar } from './Avatar'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface CommentsProps {
    comment: string;
    data: Date;
    score: number;
    picture: string
    patientName: string
}

export function Comments({ comment, data, score, picture, patientName }: CommentsProps) {




    return (
        <>
            <div className={styles.comment}>

                <Avatar src={picture || '/svg/notPicture.svg'} />

                <div className={styles.commentBox}>
                    <div className={styles.commentContent}>
                        <header>
                            <div className={styles.authorAndTime}>
                                <strong>{patientName}</strong>

                                <time dateTime={data.toString()}>{data.toString()}</time>
                                <span className={styles.commentsScore}>Nota: {score}/5</span>
                                
                            </div>

                        </header>

                        <p>{comment}</p>
                    </div>
                </div>
            </div>
        </>
    )
}