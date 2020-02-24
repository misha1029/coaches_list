import React from 'react';
import './App.css';
import styles from './App.module.css';
import Icon from "@mdi/react";
import { mdiCheck } from "@mdi/js";
import classNames from 'classnames';
import _ from 'lodash';

function UserListItem(props) {
  const  {user, index} = props;
  const onClickHandler = () => {
    props.onClick( index);
  };
  return (
    <li className={styles.listItem}>
      <div className={styles.profilePictureWrapper}>
        <img src={user.image} alt="" className={styles.profilePicture}/>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.fullName}>
          {
            `${user.firstName} ${user.lastName}`
          }
        </div>
        <div className={styles.level}>
          {
            `Level ${user.level}`
          }
        </div>
      </div>
      <div onClick={onClickHandler} className={classNames(styles.check, { [styles.checked]:user.isSelected})}>
        <Icon size={'75%'} color={'white'} path={mdiCheck}/>
      </div>
    </li>
  );
}


class App  extends  React.Component{
  constructor (props) {
    super( props );
    this.state = {
      items: [],
      isFetching: false,
    };
  }
  loadData = () => {
    this.setState({
                    isFetching:true,
                  });
    fetch('./coaches.json').then(response => response.json())
      .then(data => {
        this.setState({
                        isFetching: false,
                        items: data.map(item => ({
                          ...item,
                          isSelected:false
                        })),
                      });
      });
  };
  componentDidMount() {
    this.loadData();
  }

  selectItemByIndex =(index) => {
    const newItems = _.clone(this.state.items);
    newItems[index].isSelected = !newItems[index].isSelected;
    this.setState({
      items: newItems,
                  });
  };

  renderItems = () => {
    return this.state.items.map( (item, index) => (

                    <UserListItem onClick ={this.selectItemByIndex} key ={item.id} user={item} index = {index}/>
          )
    );
  };

  renderSelectedList = () => {
    return (
      <li className={styles.listItemTo}>
        <div className={styles.level}>To:</div>
        <ul style={{textAlign: 'left'}}>
          {
            this.state.items.filter(item => item.isSelected).map((item, index,arr) => (
            <li className={styles.selectedItem}>{
            `${item.firstName} ${item.lastName}${index === (arr.length - 1)
                                                    ? ''
                                                    : ', '} `
             }</li>
            ) )
          }
        </ul>
      </li>
    );
  };

  render() {
    return(
      <div className={styles.container}>
        {
          this.renderSelectedList()
        }
        {
          this.renderItems()
        }
        {
          this.state.isFetching && <li className={styles.level} style={{textAlign: 'center'}}>Loading...</li>
        }
      </div>
    )
  }

}


export default App;

