import { DownOutlined }from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button } from 'antd';
import { Report} from "@/services/ant-design-pro/api";




export type TableListItem = {
  id: number;
  name: string;
  form_name: string;
  created: string;
  cyclet: string;
  createdAt: number;
  memo: string;
};
let tableListDataSource: TableListItem[] ;

const msg = await Report();
if (msg.code===1){
  tableListDataSource=msg.data

}


const columns: ProColumns<TableListItem>[] = [
  {
    title: '主机名称',
    dataIndex: 'name',
    key: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '连接协议',
    dataIndex: 'protocol',
    key: 'protocol',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
  },
  {
    title: '状态',
    dataIndex: 'active',
    key: 'active',

  },

  {
    title: '所有者',
    dataIndex: 'ownerName',
    ellipsis: true,
    copyable: true,
  },
  {
    title: '创建日期',
    dataIndex: 'created',
    key: 'created',

  },
  {
    title: '操作',
    width: 180,
    key: 'option',
    valueType: 'option',
    render: () => [
      <a key="link">接入</a>,
      <a key="link2">报警</a>,
      <a key="link3">监控</a>,
      <TableDropdown
        key="actionGroup"
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  return (
    <ProTable<TableListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      search={{
        optionRender: false,
        collapsed: false,
      }}
      dateFormatter="string"
      headerTitle="表格标题"
      toolBarRender={() => [
        <Button key="show">查看日志</Button>,
        <Button key="out">
          导出数据
          <DownOutlined />
        </Button>,
        <Button type="primary" key="primary">
          创建应用
        </Button>,
      ]}
    />
  );
};
