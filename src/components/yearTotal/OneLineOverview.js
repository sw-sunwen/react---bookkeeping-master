const OneLineOverview = ({ pay, income }) => {
    return (
        <div className="flex space-bewteen mx-4 space-x-5 w-full pt-2">
            <div className="ka-one-line-overview w-4/12 space-x-2">
                <span className="text-red-500">支出</span>
                <span className="pay">{pay}</span>
            </div>
            <div className="ka-one-line-overview w-4/12 space-x-2">
                <span>收入</span>
                <span className="income">{income}</span>
            </div>
            <div className="ka-one-line-overview w-4/12 space-x-2">
                <span>结余</span>
                <span className="balance">{income + pay}</span>
            </div>
        </div>
    )
}
export default OneLineOverview