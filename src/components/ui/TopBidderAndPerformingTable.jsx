import { Table } from 'antd';
import React from 'react';

const TopBidderAndPerformingTable = ({dataSource , tableName , title , total}) => {
    const columns = [
            {
                title: "SL no.",
                dataIndex: "key",
                key: "key",
            },
            {
                title : title,
                dataIndex  : 'bidder',
                key : 'bidder',
                render: (_, record) => {
                    return (
                        <div className="flex items-center gap-2">
                            <img
                                src={record?.img}
                                className="w-[40px] h-[40px] rounded-[8px]"
                                alt=""
                            />
                            <p className="font-medium">{record?.bidder}</p>
                        </div>
                    );
                },
            },
            {
                title : total,
                dataIndex  : 'totalWin',
                key : 'totalWin'
            }
    ]
    return (
        <div>
            <h1 className='font-medium mb-2'>{tableName}</h1>
            <Table dataSource={dataSource} columns={columns} className="custom-pagination" pagination={false} />

        </div>
    );
}

export default TopBidderAndPerformingTable;
