import styles from './doctor.module.css'
import { ThumbsUp } from 'phosphor-react'
import { Avatar } from './Avatar'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface CommentsProps {
    comment: string;
    data: Date;
    score: number
}

export function Comments({ comment, data, score }: CommentsProps) {




    return (
        <>
            <div className={styles.comment}>

                <Avatar src="https://github.com/IagoCarvalhoG.png" />

                <div className={styles.commentBox}>
                    <div className={styles.commentContent}>
                        <header>
                            <div className={styles.authorAndTime}>
                                <strong>APPLY</strong>

                                <time dateTime={data.toString()}>{data.toString()}</time>

                                
                            </div>

                        </header>

                        <p>{comment}</p>
                    </div>
                </div>
            </div>
        </>
    )
}