
import { Post, PostProps } from './Post';

// Sample data
const samplePosts: PostProps[] = [
  {
    id: '1',
    user: {
      id: '101',
      name: 'Jane Cooper',
      username: 'janecooper',
      avatar: '',
      verified: true,
    },
    content: 'Just launched my new portfolio website! Check it out and let me know what you think. I\'ve been working on this project for the past few weeks and I\'m really excited about how it turned out. #webdesign #portfolio #developer',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    createdAt: '2h ago',
    likes: 24,
    comments: 5,
    shares: 2,
    hasLiked: false,
    hasBookmarked: true,
  },
  {
    id: '2',
    user: {
      id: '102',
      name: 'Alex Morgan',
      username: 'alexmorgan',
      avatar: '',
    },
    content: 'Beautiful sunset at the beach today! Nature never fails to amaze me.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    createdAt: '4h ago',
    likes: 156,
    comments: 23,
    shares: 45,
    hasLiked: true,
  },
  {
    id: '3',
    user: {
      id: '103',
      name: 'Emma Wilson',
      username: 'emmawilson',
      avatar: '',
      verified: true,
    },
    content: 'Just finished reading this amazing book. I highly recommend it to everyone who enjoys mystery novels!',
    createdAt: '8h ago',
    likes: 42,
    comments: 7,
    shares: 3,
  },
  {
    id: '4',
    user: {
      id: '104',
      name: 'Michael Brown',
      username: 'michaelbrown',
      avatar: '',
    },
    content: 'Working on a new music project with some incredibly talented people. Can\'t wait to share it with you all!',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
    createdAt: '1d ago',
    likes: 89,
    comments: 15,
    shares: 8,
  },
  // Additional profiles and posts
  {
    id: '5',
    user: {
      id: '105',
      name: 'Sophia Davis',
      username: 'sophiadavis',
      avatar: '',
      verified: true,
    },
    content: 'Just got back from an amazing hiking trip in the mountains! The views were absolutely breathtaking. #nature #hiking #adventure',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    createdAt: '1d ago',
    likes: 211,
    comments: 32,
    shares: 18,
    hasLiked: true,
  },
  {
    id: '6',
    user: {
      id: '106',
      name: 'David Garcia',
      username: 'davidgarcia',
      avatar: '',
    },
    content: 'Just finished coding my first major project in React! It\'s been a challenging but rewarding journey. #coding #react #webdev',
    createdAt: '1d ago',
    likes: 76,
    comments: 14,
    shares: 5,
  },
  {
    id: '7',
    user: {
      id: '107',
      name: 'Olivia Martinez',
      username: 'oliviamartinez',
      avatar: '',
      verified: true,
    },
    content: 'Visited the new art exhibition downtown yesterday. The sculptures were incredible! If you\'re in town this month, I highly recommend checking it out.',
    image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249',
    createdAt: '2d ago',
    likes: 103,
    comments: 18,
    shares: 9,
    hasBookmarked: true,
  },
  {
    id: '8',
    user: {
      id: '108',
      name: 'Ethan Johnson',
      username: 'ethanjohnson',
      avatar: '',
    },
    content: 'Just adopted this adorable puppy! Meet Max, the newest addition to our family. ❤️🐕',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    createdAt: '2d ago',
    likes: 287,
    comments: 53,
    shares: 27,
    hasLiked: true,
  },
];

export function PostsList() {
  return (
    <div>
      {samplePosts.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}
