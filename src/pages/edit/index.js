import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { connect } from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { actionCreators } from './store';
import { delHtmlTag } from '../../utils';
import {
  TitleOutContainer,
  PostWrapper,
  Header,
  NavHeader,
  NavItem,
  PostTags,
  TagTextArea,
  PostTitle,
  EditorWrapper
} from './style'

class Editor extends React.Component {
  render() {
    const {postID,tags,title,token,body,photoName,handleBodyChange,handleTagChange,handleTitleChange}=this.props
    const contentStyle={
      width:'103%',
      height:'700px',
      paddingRight:'20px',
      boxSizing:'border-box'
    }
    const excludeControls = [
        'font-family', 'letter-spacing', 'subscript',
       'emoji', 'text-indent','hr','separator','superscript','text-align'
    ]
    const myUploadFn = (param) => this.props.upLoadFn(param)
    
    if (token){
    return (
      <div>
        <Header>
          <NavHeader>
              <Link to='/'>
              <NavItem className='left'>
                  回到首页
              </NavItem>
              </Link>
              <NavItem 
              className='right'
              onClick={()=>this.handleSubmit(title,body, tags,photoName)}
              >发布</NavItem>
          </NavHeader>
        </Header>
        {postID?
        <Redirect to={'/detail/' + postID}/>:
        <PostWrapper>
          <TitleOutContainer>
            <PostTitle
            value={title}
            onChange={handleTitleChange}
            />
          </TitleOutContainer>
          <EditorWrapper>
          <BraftEditor 
          media={{uploadFn:myUploadFn}}
          contentStyle={contentStyle}
          excludeControls={excludeControls}
          onChange={handleBodyChange}
          value={typeof(body)==='string'?
            BraftEditor.createEditorState(body):body} 
          />
          </EditorWrapper>
          <PostTags>
              添加标签
            <TagTextArea
            value={tags}
            onChange={handleTagChange}
            />
          </PostTags>
        </PostWrapper>
        }
      </div>
    )}else{
      return <Redirect to='/'/>
    }
  }

  handleSubmit=(title,body,tags,photoName)=>{
    const htmlContent = body.toHTML()
    const ID= this.props.match.params.id
    
    if(title.length===0||delHtmlTag(htmlContent).length===0){
      alert('标题和文章内容不能为空！')
      return;
    }else{
      this.props.submitPost(title, htmlContent,tags,ID,photoName)
    }
  };

  componentDidMount(){
    const ID = this.props.match.params.id
    if (ID){
      this.props.getInitialPost(ID)
    }else{
        return;
      }
    }
  componentWillUnmount() {
    this.props.clearStatus()
  }
 }

const mapState = (state) => ({
  photoName:state.getIn(['editor','photoName']),
  postID:state.getIn(['editor','postID']),
  token:state.getIn(['login', 'token']),
  tags:state.getIn(['editor','tags']),
  title:state.getIn(['editor','title']),
  body:state.getIn(['editor','body']),
})
  
const mapDispatch = (dispatch) => ({
  clearStatus(){
    dispatch(actionCreators.clearStatus())
  },
  submitPost(title, htmlContent,tags,ID,photoName){
    dispatch(actionCreators.editPost(title, htmlContent,tags,ID,photoName))
  },
  upLoadFn(param){
    dispatch(actionCreators.upLoadFn(param))
  },
  getInitialPost(ID){
    dispatch(actionCreators.getInitialPost(ID))
  },
  handleBodyChange(editorState){
    dispatch(actionCreators.changeBody(editorState))
  },
  handleTagChange(tag){
    dispatch(actionCreators.changeTag(tag))
  },
  handleTitleChange(title){
    dispatch(actionCreators.changeTitle(title))
  }
})
  
export default connect(mapState, mapDispatch)(withRouter(Editor));