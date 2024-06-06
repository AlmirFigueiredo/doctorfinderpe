import { useEffect, useState } from 'react'
import styles from './doctor.module.css'
import { useAuth } from '@/context/authContext'
import { api } from '@/lib/axios'
import { Comments } from './Comments'


interface PostProps {
    doctorId: number
}

interface DoctorFeedback {
    comment: string;
    score: number;
    patient_id: number;
    doctor_id: number;
    data: Date;
    feedback_id: number;
    Patient: Patient
}

interface Patient {
    User: User
}

interface User {
    name: string;
    picture: string
}

export function Post({ doctorId }: PostProps) {
    const { user } = useAuth()
    const [newCommentText, setNewCommentText] = useState('')
    const [feedbackScore, setFeedbackScore] = useState(0)
    const [commentCreated, setCommentCreated] = useState(false)
    const [allDoctorFeedbacks, setAllDoctorFeedbacks] = useState<DoctorFeedback[]>([])
    const [noFeedbacks, setNoFeedbacks] = useState(false)



    useEffect(() => {
        async function fetchAllDoctorsFeedbacks() {
            if (doctorId) {
                try {
                    const response = await api.get(`/feedbacks/doctor/${doctorId}`);
                    if (response.status === 200) {
                        setAllDoctorFeedbacks(response.data);
                    }
                } catch (error: any) {
                    if (error.response && error.response.status === 404) {
                        console.log("Sem comentários");
                        setNoFeedbacks(true);
                    } else {
                        console.error("Erro ao buscar comentários:", error);
                    }
                }
            }
        }
        fetchAllDoctorsFeedbacks();
    }, [doctorId]);

    async function handleCreateNewComment(e: any) {
        e.preventDefault()

        if (!user || !user.patient_id) {
            console.log("Você não pode comentar!")
        } else {
            const commentData = {
                doctor_id: doctorId,
                patient_id: user.patient_id,
                comment: newCommentText,
                score: feedbackScore,
                data: new Date()
            }

            console.log(commentData)

            const response = await api.post('/feedbacks', commentData)

            if (response.status) {
                setCommentCreated(true)
            } else {
                console.log("Um erro ocorreu durante a criação do comentário")
            }
        }


    }

    function handleNewCommentChange(e: any) {
        setNewCommentText(e.target.value);
    }

    const isNewCommentEmpty = newCommentText.length === 0;
    return (
        <>


            <article>
                <form onSubmit={handleCreateNewComment} className={styles.commentForm}>

                    <textarea
                        name='comment'
                        placeholder='Deixe um comentário'
                        value={newCommentText}
                        onChange={handleNewCommentChange}
                        required
                    />

                    <div className={styles.feedbackScoreDiv}>
                        <label htmlFor="score">Dê sua nota</label>
                        <input type="number" value={feedbackScore} onChange={(e) => setFeedbackScore(Number(e.target.value))} required id='score' min={0} max={5} />
                    </div>
                    {commentCreated && (
                        <p className={styles.commentCreated}>Comentário criado com sucesso!</p>
                    )}
                    <footer>
                        <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
                    </footer>
                </form>
            </article>
            {
                allDoctorFeedbacks && allDoctorFeedbacks.map((feedback) => {
                    return (
                        <Comments patientName={feedback.Patient.User.name} picture={feedback.Patient.User.picture} key={feedback.feedback_id} comment={feedback.comment} data={feedback.data} score={feedback.score} />
                    )
                })
            }
            {
                noFeedbacks && (
                    <p>Esse médico não tem nenhuma avaliação ainda!</p>
                )
            }

        </>
    )
}