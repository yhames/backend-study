# Synchronous vs Asynchronous

- [Synchronous vs Asynchronous](#synchronous-vs-asynchronous)
  - [Synchronous](#synchronous)
  - [Asynchronous](#asynchronous)

## Synchronous

**동기식** 방식에서는 호출자가 요청을 보내면 응답이 올 때까지 대기합니다.

대기하는 동안 호출자는 다른 작업을 할 수 없기 때문에, 실행 흐름이 `동기화`되어있다고 말합니다.

> 가장 흔한 예시로 `Disk`에서 파일을 `Memory`에 로드할 때 동기식으로 처리하게 되면,  
> 해당 프로그램이 대기 상태에 들어가기 때문에 `OS`에서 컨텍스트 스위칭을 하고 `CPU`는 다른 프로세스를 처리하게 됩니다.

```javascript
doWork();
readfile("VeryLargeFile.dat");  // Program can't do anything until the file loaded
doNextWork();   // NextWork will be executed after readfile finished
```

## Asynchronous

반면에 **비동기식** 방식에서는 요청을 보내고 응답을 기다리지 않고 작업을 계속 진행합니다.

호출자에서는 응답이 왔는지 확인을 해야합니다.

응답이 왔는지 확인하는 방법에는 `I/O multiplexing`(`select`, `poll`, `epoll`, `kqueue`, `IOCP` 등), `io_uring`, `multi-threading` 등의 방법이 있습니다.

```javascript
doWork();
readfile("VeryLargeFile.dat", onReadFinished(theFile));  // onReadFinished will executed when I/O work finished
doNextWork();   // NextWork will be executed while reading file
onReadFinished(theFile);  // theFile might be undefined because the program proceeds without completing reading the files
```

비동기식 처리 방식은 다양한 곳에서 사용됩니다.

* 비동기 프로그래밍
* 비동기식 백엔드 프로세싱
* `Postgres`의 비동기 commit (`WAL`, Write-Ahead Log)
* `OS`의 비동기식 I/O (`epoll`, `io_uring` 등)
* 비동기식 복제 (백업DB에 저장할 때 사용)
* OS의 비동기식 fsync (`Fs-Cache`)

> 참고자료  
> [쉬운코드 유튜브 - Asynchronous I/O](https://www.youtube.com/watch?v=EJNBLD3X2yg)  
> [쉬운코드 유튜브 - block I/O vs non-block I/O](https://www.youtube.com/watch?v=mb-QHxVfmcs&t=1031s)  
> [[네이버클라우드 기술&경험] IO Multiplexing (IO 멀티플렉싱) 기본 개념부터 심화까지 -1부-](https://blog.naver.com/PostView.naver?blogId=n_cloudplatform&logNo=222189669084&parentCategoryNo=&categoryNo=11&viewDate=&isShowPopularPosts=false&from=postView)  
> [[네이버클라우드 기술&경험] IO Multiplexing (IO 멀티플렉싱) 기본 개념부터 심화까지 -2부-](https://blog.naver.com/n_cloudplatform/222255261317)  
> [RedHat Article - Why you should use io_uring for network I/O](https://developers.redhat.com/articles/2023/04/12/why-you-should-use-iouring-network-io)  
> [LWN Article - Ringing in a new asynchronous I/O API](https://lwn.net/Articles/776703/)  
> [Postgres Docs - Write-Ahead Logging (WAL)](https://www.postgresql.org/docs/current/wal-intro.html)  
> [RedHat - FS-Cache 시작하기](https://access.redhat.com/documentation/ko-kr/red_hat_enterprise_linux/8/html/managing_file_systems/getting-started-with-fs-cache_mounting-nfs-shares)  
