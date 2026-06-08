import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/locn/index'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { addBillList } from '@/store/modules/bill-store'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'

const New = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
//   设置一个记录状态
  const [type, setType] = useState('pay') // 记录收支
  const [money, setMoney] = useState(0) // 记录金额
  const [useFor,setUseFor] = useState('') // 记账用途
  const [date,setDate] = useState(new Date()) // 记账日期

  const saveBill = () => {
    // 1. 收集表单数据
    const data = {
        type:type,
        money:type==='pay'? -money : +money,
        date:date,
        useFor:useFor
    }
    // 2.判断数据是否为空
    if(!money || !useFor){
        return alert('数据不能为空')
    }
    // 3. 保存账单
    dispatch(addBillList(data))
    // 提示保存成功并返回
    alert('保存成功')
    navigate(-1)
  }

  const [dateVisible,setDateVisible] = useState(false)
  const dateConfirm = (value) => {
    setDateVisible(false)
    setDate(value)
  }

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(type==='pay'?'selected' : '')}
            onClick={()=>setType('pay')}
          >
            支出
          </Button>
          <Button
            className={classNames(type === 'income'?'selected' : '')}
            shape="rounded"
            onClick={()=>setType('income')}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={() => setDateVisible(true)}>{dayjs(date).format('YYYY-MM-DD')}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dateVisible}
                onConfirm={dateConfirm}
                onClose={() => setDateVisible(false)}
                onCancel={() => setDateVisible(false)}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={setMoney}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {/* 数据区域 */}
        {billListData[type].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        useFor === item.type && 'selected'
                      )}
                      key={item.type}
                      onClick={()=>setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick = {saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New