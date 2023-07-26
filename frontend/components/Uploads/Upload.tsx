import { Button, ButtonGroup, Input } from '@chakra-ui/react'

import React from 'react'

export default function Upload() {
  return (<div>
        <Input margin = '5' width= '100' placeholder='Choose File' accept = 'csv' type='file'/>
        <Button margin = '5' width = '50' placeholder='Save'>Save</Button>
  </div>
      )
}
