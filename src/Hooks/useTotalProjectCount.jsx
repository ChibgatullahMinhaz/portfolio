import axios from "axios";
import React, { useEffect, useState } from "react";

const useTotalProjectCount = () => {
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    const loadTotalCount = async () => {
      const res = await axios.get("https://portfolio-server-side-mu.vercel.app/projectsCount");
      setTotalCount(res.data.count);
    };
    loadTotalCount();
  }, []);

  return totalCount;
};

export default useTotalProjectCount;
