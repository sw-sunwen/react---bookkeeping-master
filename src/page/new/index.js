import { NavBar, Input, Radio, DatePicker, Button, Toast } from 'antd-mobile'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addBill } from '../../store/modules/bill-store'
import './index.scss'
import dayjs from 'dayjs'

const New = () => {
  const [money, setMoney] = useState('')
  const [type, setType] = useState('pay')
  const [useFor, setUseFor] = useState('')
  const [date, setDate] = useState(new Date())

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!money || !useFor) {
      Toast.show({
        content: '请填写完整信息',
        icon: 'fail',
      })
      return
    }

    const moneyValue = parseFloat(money)
    if (moneyValue <= 0) {
      Toast.show({
        content: '金额必须大于0',
        icon: 'fail',
      })
      return
    }

    const billData = {
      type: type,
      money: type === 'pay' ? -Math.abs(moneyValue) : Math.abs(moneyValue),
      date: dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
      useFor: useFor,
      id: Date.now()
    }

    try {
      await dispatch(addBill(billData))
      Toast.show({
        content: '保存成功',
        icon: 'success',
      })
      navigate('/month')
    } catch (error) {
      Toast.show({
        content: '保存失败',
        icon: 'fail',
      })
    }
  }

  return (
    <div className="new">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>
      <div className="content">
        <div className="money-section">
          <div className="label">金额</div>
          <div className="money-input">
            <span className="symbol">¥</span>
            <Input
              className="input"
              placeholder="0.00"
              value={money}
              onChange={setMoney}
              type="number"
            />
          </div>
        </div>

        <div className="type-section">
          <div className="label">类型</div>
          <Radio.Group value={type} onChange={setType}>
            <Radio value="pay">支出</Radio>
            <Radio value="income">收入</Radio>
          </Radio.Group>
        </div>

        <div className="usefor-section">
          <div className="label">用途</div>
          <Input
            className="input"
            placeholder="请输入用途"
            value={useFor}
            onChange={setUseFor}
          />
        </div>

        <div className="date-section">
          <div className="label">日期</div>
          <DatePicker
            value={date}
            onConfirm={setDate}
            max={new Date()}
          >
            {value => (
              <div className="date-picker">
                {dayjs(value).format('YYYY-MM-DD')}
              </div>
            )}
          </DatePicker>
        </div>

        <div className="button-section">
          <Button color="primary" block onClick={handleSubmit}>
            保存
          </Button>
        </div>
      </div>
    </div>
  );
};

export default New;
