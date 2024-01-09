import React from 'react';
import styled from "styled-components";

const Box = styled.div<{$dark?: boolean}>`
  height: 200px;
  width: 200px;
  background-color: ${({ $dark = false }) => $dark ? "red" : "blue"};
`;

function App() {
    // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //     console.log("Dark");
    //     console.log(window.matchMedia)// dark mode
    // }
    let array = ["1", "test", "stuff", "ok"];
    let reversedArray: string[] = array.map((obj, i ,arr) => {
        return arr[arr.length - 1 - i];
    });
    console.log(reversedArray, array);
    // Promise.all(array.map((a,d,p) => {
    //     reversedArray.push(p[p.length - 1 - d]);
    //     return false;
    // })).then(() => console.log(reversedArray));

    // array.forEach((obj, i, arr) => {
    //     console.log(array);
    //     console.log(arr[arr.length - 1 - i]);
    //     array[i] = arr[arr.length - 1 - i];
    //     // console.log(array);
    // });
    // let myArray = ["a", "b", "c", "d", "e"];
    // let res: any[] = myArray.reduceRight(function (arr: any[], obj: string, index: number) {
    //     console.log(obj, index);
    //     return arr = arr.concat(obj)
    // }, []);
    // console.log(res, myArray)

  return (
    <div>
        <Box $dark={false} />
    </div>
  );
}

export default App;
