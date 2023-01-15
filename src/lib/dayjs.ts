import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import duration from 'dayjs/plugin/duration'

dayjs.locale('pt-br')
dayjs.extend(duration)
