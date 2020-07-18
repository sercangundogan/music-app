import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";
import { useFirebaseConnect } from "react-redux-firebase";

const MusicList = (props) => {
  const [progress, setProgress] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const firebase = useFirebase();

  useFirebaseConnect("/musics");

  const musics = useSelector((state) => state.firebase.data.musics);

  const musicList = [];
  musics &&
    Object.keys(musics).map((key) =>
      musicList.push({ ...musics[key], id: key })
    );

  const filterMusicList = musicList.filter((music) => {
    return music.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1;
  });

  const handleUpload = (event) => {
    const file = event.target.files[0];
    // Create a storage ref
    const storageRef = firebase.storage().ref(`/musics/${file.name}`);
    // Upload File
    const task = storageRef.put(file);
    // Update Progress Bar
    task.on(
      "state_changed",
      function progress(snapshot) {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      function error(err) {
        alert(err.message);
      },
      function complete() {
        setProgress(0);
        alert("The upload action is successfull");
        storageRef
          .getDownloadURL()
          .then((url) => firebase.push("/musics", { name: file.name, url }));
      }
    );
  };

  return (
    <div>
      {!musics ? (
        <div className="loading">
          <div id="loader" />
        </div>
      ) : (
        <div>
          <div className="search">
            <input
              type="search"
              placeholder="Search a Song!!"
              onChange={(event) => setSearchKeyword(event.target.value)}
            ></input>
            <button>Search</button>
          </div>

          <div className="musics">
            <ul>
              {filterMusicList.map((music) => (
                <li className="music" key={music.id}>
                  <div className="music-rating">
                    <span>2</span>
                    <i className="fas fa-thumbs-up"></i>
                  </div>

                  <div className="music-desc">
                    <p className="music-name">{music.name.split(".mp3", 1)}</p>
                  </div>
                  <ReactPlayer controls url={music.url} />
                </li>
              ))}
            </ul>
          </div>

          <div className="upload">
            <progress value={progress} max="100" id="uploader">
              {progress}%
            </progress>
            <input type="file" onChange={handleUpload} />
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(MusicList);
