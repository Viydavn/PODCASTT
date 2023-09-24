import React from 'react';
import Header from './../components/common/Header';
import CreatePodcastForm from '../components/StartAPodcast/CreatePodcastForm';

function CreateAPodcastPage() {


  return (
    <div>
        <Header />
        <div className="input-wrapper">
        <CreatePodcastForm />
        </div>
    </div>
  )
}

export default CreateAPodcastPage;