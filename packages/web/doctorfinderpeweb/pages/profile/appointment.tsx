import styles from './profile.module.css'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface AppointmentProps {
    name: string | string[] | undefined
}

export function Appointment({ name }: AppointmentProps) {

    let dateExample = new Date();
    dateExample.setDate(dateExample.getDate() + 10);

    return (
        <>
            <header>
                <strong>{name}</strong>
            </header>
            <div className={styles.appointment}>
                <table>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Paciente</th>
                            <th>Localização</th>
                            <th>Data</th>
                            <th>Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array(5).fill(0).map((_, index) => (
                            <tr key={index}>
                                <td>Pending</td>
                                <td>Jose Alberto</td>
                                <td>Rua do Principe</td>
                                <td>{formatDistanceToNow(dateExample, {
                                    locale: ptBR,
                                    addSuffix: true,
                                })}</td>
                                <td>10:00h</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
