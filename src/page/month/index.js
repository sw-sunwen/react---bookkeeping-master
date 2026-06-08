import { NavBar, DatePicker } from 'antd-mobile';
import { useEffect, useMemo, useState } from 'react';
import './index.scss';
import { useSelector } from 'react-redux'
import classNames from 'classnames';
import _ from 'lodash'
import dayjs from 'dayjs'
import Daybill from './components/Daybill'
const Month = () => {

  const billlist = useSelector(state => state.bill.billlist) // 从redux中获取账单数据
  //按月份进行数据的分组
  const monthGroup = useMemo(() => {
    return _.groupBy(billlist, (item) => {
      return dayjs(item.date).format('YYYY-MM')
    })
  }, [billlist])

  const [datavisible, setDatavisible] = useState(false) // 日期选择器是否可见
  const [currentmonthmoney, setCurrentmonthmoney] = useState([]) // 当前月份的账单数据
  const [date, setDate] = useState(dayjs(new Date()).format('YYYY-MM')) // 当前月份
  //按日期进行数据的分组
  const dayGroup = useMemo(() => {
    if (!currentmonthmoney || currentmonthmoney.length === 0) {
      return {
        daylist: {},
        keys: []
      }
    }
    const daylist = _.groupBy(currentmonthmoney, (item) => {
      return dayjs(item.date).format('YYYY-MM-DD')
    })
    const keys = Object.keys(daylist)
    return {
      daylist,
      keys
    }
  }, [currentmonthmoney])
  // console.log(dayGroup)
  // console.log(dayGroup.keys)
  // console.log(dayGroup.daylist)
  // 计算当前月份的收支
  const monthresult = useMemo(() => {
    const safeData = currentmonthmoney || []
        const pay = safeData.filter(item => item.type === 'pay').reduce((pre, cur) => pre + cur.money, 0)
        const income = safeData.filter(item => item.type === 'income').reduce((pre, cur) => pre + cur.money, 0)
    const total = pay + income
    return {
      pay,
      income,
      total
    }
  }, [currentmonthmoney])
  // 初始化时，设置当前月份的账单数据为当前月份的账单数据
  useEffect(() => {
    const nowdate = dayjs(new Date()).format('YYYY-MM')
    if (monthGroup[nowdate]) {
      setCurrentmonthmoney(monthGroup[nowdate])
    }
  }, [monthGroup])
  // 确认日期选择器的日期
  const onConfirmDate = (date) => {
    setDatavisible(false)
    setCurrentmonthmoney(monthGroup[dayjs(date).format('YYYY-MM')] || [])// 设置当前月份的账单数据为选中的月份的账单数据
    setDate(dayjs(date).format('YYYY-MM'))// 设置当前月份为选中的月份
  }

  return (
    <div className='monthlyBill'>
      <NavBar className='nav' backArrow={false}>
        月度收支
      </NavBar>
      <div className='content' >
        <div className='header' >
          <div className='date' onClick={() => setDatavisible(true)}>
            <span className='text'>
              {date}月账单
            </span>
            <span className={classNames('arrow', 'expand', datavisible && 'fold')}></span>
          </div>
          <div className='twoLineOverview'>
            <div className='item'>
              <span className='money'>{monthresult.pay.toFixed(2)}</span>
              <span className='type'>支出</span>
            </div>
            <div className='item'>
              <span className='money'>{monthresult.income.toFixed(2)}</span>
              <span className='type'>收入</span>
            </div>
            <div className='item'>
              <span className='money'>{monthresult.total.toFixed(2)}</span>
              <span className='type'>结余</span>
            </div>
          </div>
          <DatePicker
            className='kaDate'
            title='记账日期'
            precision='month'
            visible={datavisible}
            onCancel={() => setDatavisible(false)}
            onConfirm={onConfirmDate}
            onClose={() => setDatavisible(false)}
            maxDate={new Date()}
          />
        </div>
        {
          dayGroup.keys && dayGroup.keys.map(key => (
            <Daybill key={key} date={key} daylist={dayGroup.daylist[key]} />
          ))
        }
      </div>
    </div >
  );
}
export default Month;