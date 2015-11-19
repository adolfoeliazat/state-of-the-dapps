SubmitModal = React.createClass({

  handleSubmit(e){
    e.preventDefault();
    if(this.refs.antiSpam.getDOMNode().value !== '42'){
      alert("You failed the spam filter test.");
    }else{
      var dataObj = {};
      var $thisForm = $(this.refs.submissionForm.getDOMNode());
      $thisForm.serializeArray().forEach(function(item,i){
        dataObj[item.name] = item.value;
      });
      var self = this;
      Meteor.call("newSubmission", dataObj, function(err){
        if(err){
          alert(err);
        }else{
          alert("Thank you. Your submission will be reviewed.");
          $thisForm[0].reset();
          $(self.getDOMNode()).closeModal();
        };
      });
    };
  },

  componentDidMount() {
    $('input',this.refs.submissionForm.getDOMNode()).each(function(){
      $(this).attr('length', $(this).attr('maxlength')).characterCounter()
    })
    $('select',this.refs.submissionForm.getDOMNode()).material_select()
  },


  render() {
    return (
      <div id="submitModal" className="modal">
        <form ref='submissionForm' onSubmit={this.handleSubmit}>
          <div className="modal-content">
            <h4>Submit a Dapp</h4>
            <p>
              Complete the form below or email <a href="mailto:dapps@ethercasts.com" target="_blank">dapps@ethercasts.com</a>
            </p>
            <div className='row'>
              <div className="input-field col s12 m6">
                <input className="validate" name="dapp_name" type="text" required maxLength="32"/>
                <label>Dapp Name *</label>
              </div>
              <div className="input-field col s12 m6">
                <input className="validate" name="description" type="text" required maxLength="64"/>
                <label>Dapp Description *</label>
              </div>
            </div>
            <div className='row'>
              <div className="input-field col s12 m6">
                <input className="validate" name="contact" type="text" required maxLength="32"/>
                <label>Author Name *</label>
              </div>
              <div className="input-field col s12 m6">
                <input className="validate" name="contact_email" type="email" required maxLength="32"/>
                <label>Author Email *</label>
              </div>
            </div>
            <div className='row'>
              <div className="input-field col s12 m6">
                <input name="site" type="text" maxLength="64"/>
                <label>Site URL</label>
              </div>
              <div className="input-field col s12 m6">
                <input name="reddit" type="text" maxLength="64"/>
                <label>Reddit URL</label>
              </div>
            </div>
            <div className='row'>
              <div className="input-field col s12 m6">
                <input name="github" type="text" maxLength="64"/>
                <label>GitHub URL</label>
              </div>
              <div className="input-field col s12 m6">
                <input name="license" type="text" maxLength="10"/>
                <label>License</label>
              </div>
            </div>
            <div className='row'>
              <div className="input-field col s12">
                <input name="tags" type="text" maxLength="128"/>
                <label>Tags (comma seperated)</label>
              </div>
            </div>
            <div className='row'>
              <div className="input-field col s12 m6">
                <select name="status">
                  <option value="" disabled defaultValue>Select One</option>
                  <option value="1">Abandoned</option>
                  <option value="2">On Hold</option>
                  <option value="3">Stealth Mode</option>
                  <option value="4">Concept</option>
                  <option value="5">Work In Progress</option>
                  <option value="6">Demo</option>
                  <option value="7">Working Prototype</option>
                  <option value="8">Live</option>
                </select>
                <label>Project Status *</label>
              </div>
              <div className="input-field col s12 m6">
                <input ref='antiSpam'  className='anti-spam validate' required type="text" maxLength="3"/>
                <label>Anti Spam: 40 + 2 = ?</label>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type='submit' className="waves-effect waves-blue btn light-blue">Submit</button>
            <a href="#" className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
          </div>
        </form>
      </div>
    )
  }

})
