import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(async () => {
    postsService = new PostsService();
    postsService.create({ text: 'Some pre-existing post' });
  });

  it('should add a new post', () => {
    // arrange
    const postToCreate = post;

    // act
    const createdPost = postsService.create(postToCreate);

    // assert
    expect(createdPost.text).toBe(postToCreate.text);
    expect(createdPost.id).toBe('2');
    expect(createdPost.date).toBeDefined();

    // Проверяем через find
    const foundPost = postsService.find('2');
    expect(foundPost).toEqual(createdPost);
  });

  it('should find a post', () => {
    // arrange - создаем еще один пост
    const newPost = postsService.create(post);

    // act & assert для существующего поста
    const foundPost = postsService.find('2');
    expect(foundPost).toEqual(newPost);

    // Проверяем пост из beforeEach
    const initialPost = postsService.find('1');
    expect(initialPost?.text).toBe('Some pre-existing post');

    // Проверяем несуществующий пост
    const nonExistentPost = postsService.find('999');
    expect(nonExistentPost).toBeUndefined();
  });
});