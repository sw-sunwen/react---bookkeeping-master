import { NavBar, DatePicker} from 'antd-mobile'
import { useState,useEffect } from 'react'
import dayjs from 'dayjs'
import classNames from 'classnames'
import TwoLineOverview from '@/components/yearTotal/TwoLineOverview'
import OneLineOverview from '@/components/yearTotal/OneLineOverview'
import _ from 'lodash'
import { useMemo } from 'react'
import './index.scss'
import { useSelector } from 'react-redux'
const BillAll = () =>{
    const billList = useSelector(state => state.bill.billList)
    const [visible, setVisible] = useState(false)
    const [currentYearList,setCurrentYearList] = useState([])
    const [monthList,setMonthList] = useState([])
    const yearGroup = useMemo(() => {
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY'))
    },[billList])
    const monthGroup = useMemo(() => {
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
    },[billList])
    const onShowDate = () => {
        setVisible(true)
    }
    const [selectedYear, setSelectedYear] = useState(()=>{
        return dayjs().year()
    })
    const onHideDate = () => {
        setVisible(false)
    }
    const onDateChange = (date) => {
        const formattedMonth = dayjs(date).format('YYYY-MM');
        setSelectedYear(date.getFullYear())
        setCurrentYearList(yearGroup[date.getFullYear()])
        setMonthList(monthGroup[formattedMonth] || [])
    }
    // const maxMonth = 12
 
    // 按月份生成一个完整的月份列表
    const generateCompleteMonthList = (year) => {
        const completeMonthList = Array.from({ length: 12 }, (_, index) => {
            const month = dayjs(`${year}-${index + 1}`, 'YYYY-M').format('YYYY-MM')
            return {
                month,
                list: monthGroup[month] || [] // 如果该月份没有数据，设为空数组
            }
        })
        return completeMonthList
    }

    // 计算每个月的总收入和支出
    const monthBillList = useMemo(() => {
        const completeMonthList = generateCompleteMonthList(selectedYear)

        return completeMonthList.map((monthData) => {
            const { list } = monthData
            const pay = list.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
            const income = list.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
            return { pay, income }
        })
    }, [monthList, selectedYear])

    const overview = useMemo(()=>{
        if(!currentYearList || currentYearList.length === 0) return {pay:0,income:0,total:0}
        const pay = currentYearList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
        const income = currentYearList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
        return {
            pay,
            income
        }
    })
    
     // 初始化页面计算数据
     useEffect(()=>{
        const nowDate = dayjs().format('YYYY')
        if (yearGroup[nowDate]) {
            setCurrentYearList(yearGroup[nowDate])
            const completeMonthList = generateCompleteMonthList(nowDate)
            setMonthList(completeMonthList)
        }
    },[yearGroup])
    return (
        <div className="billDetail">
            <NavBar className="nav" left={null}>
                <div className="nav-title" onClick={onShowDate}>
                {selectedYear}年
                <span className={classNames('arrow', visible && 'expand')}></span>
                </div>
            </NavBar>
            <DatePicker
                className="kaDate"
                title="记账日期"
                precision="year"
                visible={visible}
                onClose={onHideDate}
                max={new Date()}
                onConfirm={onDateChange}
            />

      <div className="content">
        <div className='overview w-full'>
          <TwoLineOverview
            pay={overview.pay}
            income={overview.income}
            className="overview"
          />
        </div>
        <div className="monthBillWrapper w-full">
            {monthBillList.map((item, index) => {
            return (
                <div
                className="monthBill flex items-center flex-col space-between w-10/12 px-4 py-2 bg-white border-solid border-2 mb-2 border-gray-300 rounded-md"
                key={index}
                >
                <div className="date w-full text-left text-lg text-neutral-800">{ index + 1}月</div>
                <OneLineOverview pay={item.pay} income={item.income} />
                </div>
            )
            })}
        </div>
      </div>
    </div>
    )
}


export default BillAll