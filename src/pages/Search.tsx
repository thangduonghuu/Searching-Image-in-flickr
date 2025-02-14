import { Image, Table } from "antd";
import Search from "antd/es/input/Search";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFlickrSearch } from "../api/photo";
import { RootState } from "../app/store";
import { setQuery } from "../features/searchSlice";
import SpeedTest from "../features/TestSpeed";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.search.query);
  const { data, isLoading } = useFlickrSearch(query);

  const columns = [
    {
      title: 'Images',
      dataIndex: 'images',
      key: 'image',
      render: (text: string) => <Image
        width={200}
        src={text}
      />,
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Tags',
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: 'Links',
      dataIndex: 'link',
      key: 'link',
    },
  ];

  return (
    <div style={{
      width: '100%',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <h1>Searching Image in flickr</h1>
        <SpeedTest />
      </div>
      <Search placeholder="input search text" value={query} onChange={(e) => dispatch(setQuery(e.target.value))} style={{ width: 200 }} />
      <div style={{
        paddingTop: 20,
      }}>
        <Table dataSource={data} loading={isLoading} columns={columns} />
      </div>
    </div>
  );
};

export default App;
