import React from 'react';

import 'codemirror/lib/codemirror.css';
import './ProgramEditorView.css';

import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import { FaHammer, FaPlay } from 'react-icons/fa';
import CodeMirror from 'react-codemirror';

import NavBar from './NavBar';

require('./mode/sigma16');

export default class ProgramEditorView extends React.Component {
  constructor( props, context ) {
    super( props );

    this.state = {
      code : ''
    };
  }

  componentDidMount() {
    this.setState( { code: this.props.code } );
  }

  componentDidUpdate() {
  }

  breakpoints( code ) {
    if ( document.getElementById( 'breakpoint-column' ) ) {

      //TODO: include so breakpoints dont reset on rerender
      var lines = code.split( '\n' );

      var column = document.getElementById( 'breakpoint-column' );

      // deal with code chunk height in this function since only column rendered
      var codeArea = document.getElementById( 'code-area' );
      codeArea.style.height = ( 25 * ( lines.length ) ) + 18 + 'px';

      column.innerHTML = '';

      for ( var i = 0; i < lines.length; i++ ) {
        var yOffset = 25 * ( i + 0.5 );

        var ev = document.createElement( 'div' );
        ev.className = 'breakpoint';
        ev.style.top = yOffset + 3 +'px';

        ev.onclick = ( function(i) {
          return function() {
            var breakPoints = this.children;

            if ( breakPoints[i].classList.contains( 'active' ) ) {
              breakPoints[i].classList.remove( 'active' );
            } else {
              breakPoints[i].classList.add( 'active' );
            }
          }.bind(column);
        })(i);

        column.appendChild(ev);
      }
    }
  }

  // parseLine( ev, line ) {
  //   var parsed = {
  //     'label' : '',
  //     'command' : '',
  //     'address' : '',
  //     'comment' : ''
  //   };  

  //   var elementsOfLine = line.split(';');

  //   for ( var it = 0; it < elementsOfLine.length; it++ ) {
  //     if ( line === '' ) {
  //       parsed.comment += '\xa0';
  //     } else if ( elementsOfLine[it] === '' && it !== 0 ) {
  //       parsed.comment += ';';
  //     } else {
  //       // elementOfLine is not a comment;

  //       if ( it !== 0 ) {
  //         parsed.comment += ';'+elementsOfLine[it];
  //       } else {
  //         var elementsOfLineBeforeComment = elementsOfLine[it].split( ' ' );

  //         var instructionIndex = 0;          
          
  //         for ( var ite = 0; ite < elementsOfLineBeforeComment.length; ite++ ) {
  //           if ( elementsOfLine[it] === '' ) {
  //             parsed.comment += '';
  //           } else if ( elementsOfLineBeforeComment[ite] === '' ) {
  //             parsed[instructionLayout[instructionIndex]] += '\xa0';
  //             instructionIndex++;
  //             //// TODO: fix so that multiple spaces work
  //           } else if ( elementsOfLineBeforeComment[ite] === '\n' ) {
  //             parsed.comment += '\n';
  //           } else {
  //             parsed[instructionLayout[instructionIndex]] += elementsOfLineBeforeComment[ite];
  //             if ( ite !== ( elementsOfLineBeforeComment.length - 1 ) ) {
  //               parsed[instructionLayout[instructionIndex]] += ' ';
  //             }
  //             instructionIndex++;
  //           }
  //         }
  //       }



  //     }
  //   }
  //   return parsed
  // }

  updateCode = newCode => {
    if ( newCode ) {
      this.setState( { code : newCode } );
    } else {
      this.setState( { code : ' ' } );
    }
  }

  render() {
    return(
      <React.Fragment>
        <NavBar currentKey={ this.props.location.pathname }/>
        <div className='buttonstoolbar'>
          <Row>
            <Col>
              <ButtonGroup>
                <Button variant='outline-secondary' size='sm'>
                  <FaHammer/>
                </Button>
                <Button variant='outline-secondary' size='sm'>
                  <FaPlay/>
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </div>    
        <div className='mainbody'>
          <Row>
            <div id="code-area" className='code-area'> 
              <div id='breakpoint-column' className='breakpoint-column'>
                {this.breakpoints(this.state.code)}
              </div>
              { this.state.code &&
                <CodeMirror
                  mode='sigma16'
                  value={this.state.code} 
                  onChange={this.updateCode} 
                  options={{ lineNumbers : true, scrollbarStyle: "null" }}
                  className='code-chunk-column'
                  autoFocus/>
              }
            </div>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}