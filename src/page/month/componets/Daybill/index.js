import './index.scss'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useState } from 'react'
import Icon from '../../../../components/index'

const Daybill = ({ date, daylist }) => {
  //由箭头控制是否可�?
  const [visible, setVisible] = useState(false)
  return (
    <div className={classNames('dailybill')}>
      <div className='header'>
        <div className='dataIcon'>
          <span className='date'>{dayjs(date).format('YYYY-MM-DD')}</span>
          <span className={classNames('arrow', { 'rotate': visible })} onClick={() => setVisible(!visible)}>
          </span>
        </div>
        <div className='onelineoverview'>
          <div className='pay'>
            <span className='money'>{daylist.filter(item => item.type === 'pay').reduce((pre, cur) => pre + cur.money, 0)}</span>
            <span className='type'>支出</span>
          </div>
          <div className='income'>
            <span className='money'>{daylist.filter(item => item.type === 'income').reduce((pre, cur) => pre + cur.money, 0)}</span>
            <span className='type'>收入</span>
          </div>
          <div className='total'>
            <span className='money'>{daylist.reduce((pre, cur) => pre + cur.money, 0).toFixed(2)}</span>
            <span className='type'>结余</span>
          </div>
        </div>
      </div>
      {/* 单列表单 */}
      <div className="daylist" style={{ display: visible ? 'block' : 'none' }}>
        {daylist.map(item => {
          return (
            <div className="bill" key={item.id}>
              <Icon type={item.useFor} />
              <div className="detail">
                <div className="billType">{item.useFor}</div>
                <div></div>
                <div className={classNames('money', item.type)}>
                  {item.money.toFixed(2)}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Daybill