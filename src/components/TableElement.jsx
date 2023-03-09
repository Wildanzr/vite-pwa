import { useState, useEffect } from "react";
import { useGlobal } from "../contexts/Global";

import { Spin, Table, Button } from "antd"
import axios from "axios";

export default function TableElement () {
  // Global States
  const globalStates = useGlobal();
  const { search, setSelected, fetch, setFetch } = globalStates;

  // Local States
  const [data, setData] = useState(null);
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: age => <span>{age}</span>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: email => <span>{email}</span>
    },
    {
      title: 'Picture',
      dataIndex: 'picture',
      key: 'picture', 
      render: picture => <img src={picture} alt="profile" width={50} height={50} />
    },
    {
      title: 'Action',
      key: 'username',
      render: (record) => (
        <div className="w-full flex flex-row space-x-3">
          <Button type="primary" onClick={() => setSelected(record.username)}>Edit</Button>
          <Button type="primary" onClick={() => deleteData(record.username)} danger>Hapus</Button>
        </div>
      )
    }
  ]

  const fetchData = async () => {
    let endpoint = search === ""
      ? 'https://sm.wildanzr.my.id/api/user'
      : `https://sm.wildanzr.my.id/api/user/${search}`

    try {
      const { data } = await axios.get(endpoint);
      setData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setFetch(false);
    }

  }

  const deleteData = async (id) => {
    try {
      const { data } = await axios.delete(`https://sm.wildanzr.my.id/api/user/${id}`);
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setFetch(true);
    }
  }


  useEffect(() => {
    if (fetch) fetchData();
  }, [fetch])

  useEffect(() => {
    fetchData();
  }, [search])
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {data === null
        ? <Spin size="default"/>
        : <Table columns={columns} dataSource={data} />
      }
    </div>
  )
}
